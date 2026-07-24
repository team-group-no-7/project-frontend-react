import React from 'react'
import Sidebar from './Sidebar'
import TopNavbar from './TopNavbar'
import { INITIAL_USER } from '@/data/mockData'

export default function DashboardLayout({ children, title, currentPage, onChangePage, profile = INITIAL_USER, onSwitchRole }) {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 flex">
            <Sidebar currentPage={currentPage} onChangePage={onChangePage} />

            <div className="flex-1 min-h-screen flex flex-col overflow-x-hidden">
                <TopNavbar title={title} profile={profile} onSwitchRole={onSwitchRole} />
                <main className="p-6 flex-1 bg-slate-50 dark:bg-slate-950">{children}</main>
            </div>
        </div>
    )
}
