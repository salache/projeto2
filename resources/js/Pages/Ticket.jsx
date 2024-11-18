import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Ticket(props) {

    const { ticket } = props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Detalhes do Ticket #{ticket.id}
                </h2>
            }
        >
            <Head title={`Ticket #${ticket.id}`} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">

                        <div className="p-4 bg-white rounded-lg shadow-md">
                            <div className="mb-4">
                                <strong>ID:</strong> {ticket.id}
                            </div>
                            <div className="mb-4">
                                <strong>Assunto:</strong> {ticket.subject}
                            </div>
                            <div className="mb-4">
                                <strong>Status:</strong> {ticket.status}
                            </div>
                            <div className="mb-4">
                                <strong>Destinatários:</strong> {ticket.recipients}
                            </div>
                            <div className="mb-4">
                                <strong>Criado em:</strong> {ticket.created_at}
                            </div>
                            <div className="mb-4">
                                <strong>Última atualização:</strong> {ticket.updated_at}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
