import { AmbientAssistantProvider } from '@/contexts/AmbientAssistantContext';
import { AmbientAssistant } from '@/components/ambient-assistant';

/**
 * Client-side wrapper for the Ambient AI Assistant.
 * This component wraps the assistant in its context provider
 * and is rendered at the root layout level for global availability.
 */
export function AmbientAssistantWrapper() {
    return (
        <AmbientAssistantProvider>
            <AmbientAssistant />
        </AmbientAssistantProvider>
    );
}

export default AmbientAssistantWrapper;
