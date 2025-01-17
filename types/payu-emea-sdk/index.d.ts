// Type definitions for payu-emea-sdk 1.0
// Project: https://developers.payu.com/en/card_tokenization.html#secureform
// Definitions by: Tomasz Regdos <https://github.com/regdos/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare var PayU: payu.PayuEntry;

declare namespace payu {
    interface PayuEntry {
        (posId: string, options?: PayuOptions): PayU;
    }

    interface PayuOptions {
        dev?: boolean | undefined;
    }

    type tokenType = "SINGLE" | "SINGLE_LONGTERM" | "MULTI";
    interface PayU {
        secureForms(options?: SecureFormsOptions): SecureForms;
        tokenize(type?: tokenType): Promise<TokenizeResultSuccess | TokenizeResultError>;
        sendCvv(refReqId: string): Promise<SendCvvResultSuccess | SendCvvResultError>;
        extractRefReqId(input: string): string;
    }

    interface SecureFormsOptions {
        fonts?: FontOptions[] | undefined;
    }

    type fontWeightNumber = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

    interface FontOptions {
        family: string;
        src: string;
        display?: "auto" | "block" | "swap" | "fallback" | "optional" | undefined;
        style?: "normal" | "italic" | "oblique" | undefined;
        weight?: "normal" | "bold" | fontWeightNumber | undefined;
        unicodeRange?: string | undefined;
    }

    type secureFormType = "card" | "number" | "date" | "cvv";
    interface SecureForms {
        add(type?: secureFormType, options?: SecureFormOptions): SecureForm;
    }

    interface SecureFormOptions {
        style?: StyleOptions | undefined;
        placeholder?: PlaceHolderOptions | undefined;
        lang?: "pl" | "en" | "cs" | "sk" | undefined;
        disabled?: boolean | undefined;
        cardIcon?: boolean | undefined;
    }

    type fontWeight = "normal" | "bold" | "lighter" | "bolder" | "inherit" | "initial" | "unset" | fontWeightNumber;
    interface StyleOptions {
        basic?: {
            fontColor?: string | undefined;
            fontSize?: string | undefined;
            fontFamily?: string | undefined;
            fontWeight?: fontWeight | undefined;
            letterSpacing?: string | undefined;
        } | undefined;
        invalid?: {
            fontColor?: string | undefined;
            fontWeight?: fontWeight | undefined;
        } | undefined;
        focus?: {
            fontColor?: string | undefined;
            fontWeight?: fontWeight | undefined;
        } | undefined;
        placeholder?: {
            fontColor?: string | undefined;
            fontWeight?: fontWeight | undefined;
        } | undefined;
        disabled?: {
            fontColor?: string | undefined;
            fontWeight?: fontWeight | undefined;
        } | undefined;
    }

    interface PlaceHolderOptions {
        number?: string | undefined;
        date?: string | undefined;
        cvv?: string | undefined;
    }

    type eventTypes = "ready" | "focus" | "blur";
    interface SecureForm {
        render(selector: string): SecureForm;
        update(options: SecureFormOptions): SecureForm;
        on(event: eventTypes, handler: () => void): SecureForm;
        on(event: "change", handler: (body: SecureFormChangeResponse) => void): SecureForm;
        clear(): SecureForm;
        focus(): SecureForm;
        remove(): SecureForm;
    }

    type SecureFormErrorCode =
        | "error.validation.card.empty"
        | "error.validation.card.length"
        | "error.validation.card.number"
        | "error.validation.card.unsupported"
        | "error.validation.expDate.empty"
        | "error.validation.expDate.past"
        | "error.validation.expDate.value"
        | "error.validation.cvv.empty"
        | "error.validation.cvv.value"
        | "error.tokenization"
        | "error.send.cvv"
        | "error.network";

    interface SecureFormErrorMessage {
        type: "validation" | "technical";
        code: SecureFormErrorCode;
        message: string;
        parameters?: {
            error: string;
        } | undefined;
        source?: secureFormType | undefined;
    }

    interface SecureFormChangeResponse {
        empty: boolean;
        error: false | SecureFormErrorMessage[];
        brand?: "visa" | "mastercard" | "maestro" | undefined;
        length?: number | undefined;
    }

    interface TokenizeResultSuccess {
        status: "SUCCESS";
        body: {
            token: string;
            mask: string;
        };
    }

    interface TokenizeResultError {
        status: "ERROR";
        error: {
            messages: SecureFormErrorMessage[];
        };
        correlationId?: string | undefined;
    }

    interface SendCvvResultSuccess {
        status: "SUCCESS";
    }

    interface SendCvvResultError {
        status: "ERROR";
        error: {
            messages: SecureFormErrorMessage[];
        };
        correlationId?: string | undefined;
    }
}
