"use client"
import React, {useState} from 'react';
import {useGetCalls} from "@/hooks/useGetCalls";
import {useRouter} from "next/navigation";

import {Call, CallRecording} from "@stream-io/video-react-sdk";
import MeetingCard from "@/components/MeetingCard";
import Loader from "@/components/Loader";

type TypeProps = "upcoming" | "ended" | "recordings";
const CallList = ({ type }: TypeProps) => {

    const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
    const router = useRouter();
    const [recordings, setRecordings] = useState<CallRecording>([])

    const getCalls = () => {
        switch (type) {
            case "ended":
                return endedCalls;
            case 'recordings':
                return callRecordings;
            case "upcoming":
                return upcomingCalls;
            default:
                return [];
        }
    }

    const getNoCallMessages = () => {
        switch (type) {
            case "ended":
                return "No Previous Call";
            case 'recordings':
                return "No Call Recordings";
            case "upcoming":
                return "No Upcoming Calls";
            default:
                return "";
        }
    }

    const calls = getCalls();
    const nocallMessages = getNoCallMessages();

    if (isLoading) return <Loader />;

    return (
        <div className="grid grid-cols-1 gap-1 xl:grid-cols-2">
            {calls && calls.length > 0 ? calls.map((meeting: Call | CallRecording) => (
                <MeetingCard
                    key={(meeting as Call)?.id}
                    icon={
                        type === 'ended' ? "/icons/previous.svg" :
                        type === 'upcoming' ? "/icons/upcoming.svg" :
                            "/icons/recordings.svg"
                    }
                    title={(meeting as Call).state.custom.description.substring(0, 25) || 'No description'}
                    date={(meeting as Call).state.startsAt.toLocaleString() || (meeting as Call).start_time.toLocaleString()}
                    isPreviousMeeting={type === "ended"}
                    buttonIcon1={type === "recordings" ? "/icons/play.svg" : undefined}
                    handleClick={type === "recordings" ? () => {
                        router.push(`${(meeting as Call)?.url}`)
                    } : () => {
                        router.push(`/meeting/${(meeting as Call)?.id}`)
                    }}
                    link={type === "recordings" ? (meeting as Call).url
                        : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`}
                    buttonText={type === "recordings" ? "Play" : "Start"}
                />
            )) : (
                <h1>{nocallMessages}</h1>
            )}
        </div>
    );
};

export default CallList;