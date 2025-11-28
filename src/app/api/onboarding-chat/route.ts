import { NextResponse } from 'next/server';

enum OnboardingStep {
  WELCOME,
  BUSINESS_BASICS,
  BUSINESS_DETAILS,
  OWNER_INFO,
  PARTNERS,
  DOCUMENT_UPLOAD,
  ADDITIONAL_INFO,
  CITIZENSHIP,
  AUTHORIZATION,
  COMPLETE,
}

interface ConversationContext {
  currentStep: OnboardingStep;
  businessData?: any;
}

const stepHandlers: Record<OnboardingStep, (context: ConversationContext, message?: any) => any> = {
  [OnboardingStep.WELCOME]: handleWelcome,
  [OnboardingStep.BUSINESS_BASICS]: handleBusinessBasics,
  [OnboardingStep.BUSINESS_DETAILS]: handleBusinessDetails,
  [OnboardingStep.OWNER_INFO]: () => ({ messages: [{ role: 'assistant', content: "Tell me about the owner." }], newContext: { currentStep: OnboardingStep.PARTNERS } }),
  [OnboardingStep.PARTNERS]: () => ({ messages: [{ role: 'assistant', content: "Any other partners?" }], newContext: { currentStep: OnboardingStep.DOCUMENT_UPLOAD } }),
  [OnboardingStep.DOCUMENT_UPLOAD]: handleDocumentUpload,
  [OnboardingStep.ADDITIONAL_INFO]: () => ({ messages: [{ role: 'assistant', content: "Any additional info?" }], newContext: { currentStep: OnboardingStep.CITIZENSHIP } }),
  [OnboardingStep.CITIZENSHIP]: () => ({ messages: [{ role: 'assistant', content: "Let's confirm citizenship." }], newContext: { currentStep: OnboardingStep.AUTHORIZATION } }),
  [OnboardingStep.AUTHORIZATION]: () => ({ messages: [{ role: 'assistant', content: "Please authorize." }], newContext: { currentStep: OnboardingStep.COMPLETE } }),
  [OnboardingStep.COMPLETE]: () => ({ messages: [{ role: 'assistant', content: "Onboarding complete!" }], newContext: { currentStep: OnboardingStep.COMPLETE } }),
};

function handleWelcome(context: ConversationContext): { messages: any[], newContext: ConversationContext } {
  const welcomeMessage = {
    role: 'assistant',
    content: "Welcome to the Split Payments onboarding studio. I'm here to guide you through the process. Let's get started!",
  };
  const newContext = { ...context, currentStep: OnboardingStep.BUSINESS_BASICS };
  const nextStepResponse = stepHandlers[newContext.currentStep](newContext);

  return {
    messages: [welcomeMessage, ...nextStepResponse.messages],
    newContext: nextStepResponse.newContext,
  };
}

function handleBusinessBasics(context: ConversationContext, message?: any): { messages: any[], newContext: ConversationContext } {
  if (message && message.type === 'widget_submission' && message.widget === 'business_basics') {
    const newContext = { ...context, businessData: message.data, currentStep: OnboardingStep.BUSINESS_DETAILS };
    const nextStepResponse = stepHandlers[newContext.currentStep](newContext);
    return {
      messages: [{ role: 'assistant', content: 'Great, I have your business basics.' }, ...nextStepResponse.messages],
      newContext: nextStepResponse.newContext,
    };
  }

  return {
    messages: [{ role: 'assistant', content: "Let's start with your business basics. Please fill out the form below.", widget: 'business_basics' }],
    newContext: { ...context, currentStep: OnboardingStep.BUSINESS_BASICS },
  };
}

function handleBusinessDetails(context: ConversationContext): { messages: any[], newContext: ConversationContext } {
  // This will be updated to render the BusinessDetails widget
  return {
    messages: [{ role: 'assistant', content: "Now for the business details." }],
    newContext: { ...context, currentStep: OnboardingStep.OWNER_INFO },
  };
}

function handleDocumentUpload(context: ConversationContext, message?: any): { messages: any[], newContext: ConversationContext } {
  if (message && message.type === 'file_upload_success') {
    const newContext = { ...context, currentStep: OnboardingStep.ADDITIONAL_INFO };
    const nextStepResponse = stepHandlers[newContext.currentStep](newContext);
    return {
      messages: [{ role: 'assistant', content: message.data.message }, ...nextStepResponse.messages],
      newContext: nextStepResponse.newContext,
    };
  }

  return {
    messages: [{ role: 'assistant', content: 'Please upload your merchant statements.', widget: 'file_upload' }],
    newContext: { ...context, currentStep: OnboardingStep.DOCUMENT_UPLOAD },
  };
}


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, context } = body as { message: any, context: ConversationContext | null };

    const currentContext = context || { currentStep: OnboardingStep.WELCOME };

    const handler = stepHandlers[currentContext.currentStep];
    if (!handler) {
      throw new Error(`No handler for step: ${currentContext.currentStep}`);
    }

    const response = handler(currentContext, message);

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in onboarding-chat API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
