import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';
import { Link } from '@inertiajs/react';
import dayjs from 'dayjs';

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
                            <table className="min-w-full table-auto">
                                <thead>
                                    <tr className="border-b">
                                        <th className="px-4 py-2 text-left">ID</th>
                                        <th className="px-4 py-2 text-left">Última Atualização</th>
                                        <th className="px-4 py-2 text-left">Aluno</th>
                                        <th className="px-4 py-2 text-left">Destinatários</th>
                                        <th className="px-4 py-2 text-left">Status</th>
                                        <th className="px-4 py-2 text-left">Data de criação</th>
                                        <th className="px-4 py-2 text-left">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(tickets) && tickets.length > 0 ? (
                                        tickets.map(ticket => (
                                            <tr key={ticket.id} className="border-b">
                                                <td className="px-4 py-2">
                                                    <Link href={`/ticket/${ticket.id}`} className="text-blue-500 hover:underline">
                                                        {ticket.id}
                                                    </Link>
                                                </td>
                                                <td className="px-4 py-2">{dayjs(ticket.updated_at).format('DD/MM/YYYY HH:mm')}</td>
                                                <td className="px-4 py-2">{ticket.subject}</td>
                                                <td className="px-4 py-2">{ticket.recipients}</td>
                                                <td className="px-4 py-2">{ticket.status}</td>
                                                <td className="px-4 py-2">{dayjs(ticket.created_at).format('DD/MM/YYYY HH:mm')}</td>
                                                <td className="px-4 py-2">
                                                    <Link href={`/ticket/${ticket.id}/confirm`} className="text-blue-500 hover:text-blue-700 mr-4">
                                                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                                                            Validar
                                                        </button>
                                                    </Link>
                                                    <Link href={`/ticket/${ticket.id}/delete`} className="text-red-500 hover:text-red-700">
                                                        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
                                                            Apagar
                                                        </button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="px-4 py-2 text-center">Nenhum ticket encontrado.</td>
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
