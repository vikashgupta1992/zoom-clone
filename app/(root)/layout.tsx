import { ReactNode } from "react";
import StreamVideoProvider from "@/providers/StreamClientProvider";

interface childrenRef {
    children: ReactNode;
}

const RootLayout = ({ children }: childrenRef) => {
    return (
        <main>
            <StreamVideoProvider>
                {children}
            </StreamVideoProvider>
        </main>
    );
};

export default RootLayout;