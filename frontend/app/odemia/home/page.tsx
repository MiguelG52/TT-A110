'use client';
import HomeHeader from "@/components/headers/home-header";
import { CreateProjectModal } from "@/components/modals/create-project-modal";
import { CreateTeamModal } from "@/components/modals/create-team-modal";
import { JoinTeamModal } from "@/components/modals/join-team-modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import SummayTab from "./sumary";
import ProjectsTab from "./projects";
import TeamsTab from "./teams";

export default function DashboardPage() {
    const [joinTeamModalOpen, setJoinTeamModalOpen] = useState(false)
    const [createTeamModalOpen, setCreateTeamModalOpen] = useState(false)
    const [createProjectModalOpen, setCreateProjectModalOpen] = useState(false)
    const tabsTitles = ['resumen','proyectos','equipos']
    return (
        <>
            <HomeHeader
                setCreateProjectModalOpen={setCreateProjectModalOpen}
                setJoinTeamModalOpen={setJoinTeamModalOpen}
                setCreateTeamModalOpen={setCreateTeamModalOpen}
            />
            <Tabs defaultValue={tabsTitles[0]} className="mb-8">
                <TabsList className="bg-transparent border-b w-full justify-start rounded-none h-auto p-0 mb-6">
                {tabsTitles.map((title) => (
                    <TabsTrigger 
                        key={title}
                        value={title}
                        className="rounded-none capitalize border-b-2 border-transparent data-[state=active]:border-blue-400 data-[state=active]:bg-transparent px-4 py-2"
                    >
                        {title}
                    </TabsTrigger>
                ))}
                </TabsList>

                <TabsContent value="resumen">
                    <SummayTab/>
                </TabsContent>

                <TabsContent value="proyectos">
                    <ProjectsTab/>
                </TabsContent>
                    
                <TabsContent value="equipos">
                    <TeamsTab/>
                </TabsContent>
            </Tabs>    
            {/* Modales */}
            <JoinTeamModal isOpen={joinTeamModalOpen} onClose={() => setJoinTeamModalOpen(false)} />
            <CreateTeamModal isOpen={createTeamModalOpen} onClose={() => setCreateTeamModalOpen(false)} />
            <CreateProjectModal isOpen={createProjectModalOpen} onClose={() => setCreateProjectModalOpen(false)} />
        </>
    );
}