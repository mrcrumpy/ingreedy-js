declare module "ingreedy-js" {
    namespace Ingreedy {
        function parse(inpug: string): any;

        type SyntaxError = PegjsError;
        var SyntaxError: any;
    }

    interface PegjsError extends Error {
        name: string;
        message: string;
        location: any;
        found?: any;
        expected?: ExpectedItem[];
        stack?: any;
    }

    interface ExpectedItem {
        type: string;
        value?: string;
        description: string;
    }
}
