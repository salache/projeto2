import InputLabel from '@/Components/InputLabel';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, usePage } from '@inertiajs/react';
import React, { useEffect } from 'react';

export default function ConfirmTicket() {
    // Pegando o ID do ticket da URL
    const { ticket } = usePage().props; // Assume que os dados do ticket são passados pela URL
    const { data, setData, put, processing, errors } = useForm({
        professor: ticket.professor || '',
        confirm: ticket.confirm || false, // Adicionando campo para confirmar o recebimento
        status: ticket.status || false, // Adicionando campo para alterar status
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('professor', data.professor);
        formData.append('confirm', data.confirm);
        formData.append('status', data.status);

        // Envia para a rota que faz o update do ticket
        put(`/tickets/${ticket.id}`, formData); 
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Confirmar Ticket
                </h2>
            }
        >
            <Head title="Confirmar Ticket" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit} encType="multipart/form-data" method="POST">
                                <div>
                                    <InputLabel htmlFor="professor" value="Professor" />
                                    <TextInput
                                        type='text'
                                        id='professor'
                                        value={data.professor}
                                        onChange={(e) => setData('professor', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.professor} className="mt-2" />
                                </div>

                                {/* Checkbox para confirmar recebimento */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="confirm" value="Recebi o e-mail da coordenação." />
                                    <Checkbox
                                        name="confirm"
                                        value={data.confirm}
                                        onChange={(e) => setData('confirm', e.target.checked)}
                                    />
                                    <InputError message={errors.confirm} className="mt-2" />
                                </div>

                                {/* Checkbox para alterar o status */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="status" value="Confirmo que li e estou ciente desse PEI." />
                                    <Checkbox
                                        name="status"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.checked)}
                                    />
                                    <InputError message={errors.status} className="mt-2" />
                                </div>

                                <PrimaryButton type="submit" disabled={processing}>
                                    Validar
                                </PrimaryButton>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
