/**
 * An error which carries additional context.
 */
export class ErrorWithContext extends Error {
    staticMessage?: string;
    context?: Record<string, unknown>;

    constructor(context?: Record<string, unknown>, message?: string) {
        const dynamicMessage = JSON.stringify({ context, message });
        super(dynamicMessage);
        this.staticMessage = message;
        this.context = context;
    }
}
