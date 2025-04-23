'use client';
import HomeHeader from "@/components/home-header";
import { CreateProjectModal } from "@/components/modals/create-project-modal";
import { CreateTeamModal } from "@/components/modals/create-team-modal";
import { JoinTeamModal } from "@/components/modals/join-team-modal";
import { useState } from "react";

export default function DashboardPage() {
    const [joinTeamModalOpen, setJoinTeamModalOpen] = useState(false)
    const [createTeamModalOpen, setCreateTeamModalOpen] = useState(false)
    const [createProjectModalOpen, setCreateProjectModalOpen] = useState(false)

    return (
        <section className="flex-1 w-full h-full flex flex-col items-left justify-up bg-white p-6">
            <HomeHeader
                setCreateProjectModalOpen={setCreateProjectModalOpen}
                setJoinTeamModalOpen={setJoinTeamModalOpen}
                setCreateTeamModalOpen={setCreateTeamModalOpen}
            />
    
            {/* Modales */}
            <JoinTeamModal isOpen={joinTeamModalOpen} onClose={() => setJoinTeamModalOpen(false)} />
            <CreateTeamModal isOpen={createTeamModalOpen} onClose={() => setCreateTeamModalOpen(false)} />
            <CreateProjectModal isOpen={createProjectModalOpen} onClose={() => setCreateProjectModalOpen(false)} />
        </section>
    );
}