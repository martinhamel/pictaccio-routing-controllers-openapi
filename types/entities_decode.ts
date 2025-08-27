declare module 'entities/decode' {
    export interface EntityDecoder {
        decode(input: string): string;
    }
}