import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';
import { Link } from '@inertiajs/react';

export default function Dashboard({ tickets }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Página Inicial
                </h2>

            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Última Atualização</th>
                                        <th>Assunto</th>
                                        <th>Destinatários</th>
                                        <th>Status</th>
                                        <th>Data de criação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(tickets) && tickets.length > 0 ? (
                                        tickets.map(ticket => (
                                            <tr key={ticket.id}>
                                                <td>
                                                    {/* Link para a página de detalhes do ticket usando Inertia.js */}
                                                    <Link href={`/ticket/${ticket.id}`} className="text-blue-500 hover:underline">
                                                        {ticket.id}
                                                    </Link>
                                                </td>
                                                <td>{ticket.updated_at}</td>
                                                <td>{ticket.subject}</td>
                                                <td>{ticket.recipients}</td>
                                                <td>{ticket.status}</td>
                                                <td>{ticket.created_at}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3">Nenhum ticket encontrado.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
