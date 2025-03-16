import React from 'react';
import CallList from "@/components/CallList";

const Recordings = () => {
    return (
        <section className="flex size-full flex-col gap-10 text-white">
            <h1 className="text-3xl font-bold">
                Record Me
            </h1>

            <CallList type="recordings" />
        </section>
    );
};

export default Recordings;