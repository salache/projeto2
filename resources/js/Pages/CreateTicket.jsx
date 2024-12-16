import InputLabel from '@/Components/InputLabel';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';

export default function CreateTicket() {
    const { data, setData, post, processing, errors } = useForm({
        subject: '',
        RA:'',
        recipients: '',
        uploaded_file: null,
    });

    const handleFileChange = (e) => {
        setData('uploaded_file', e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('subject', data.subject);
        formData.append('RA', data.RA);
        formData.append('recipients', data.recipients);
        formData.append('uploaded_file', data.uploaded_file);

        post('/tickets', formData); // Envia os dados para a rota '/tickets'
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Criar Ticket
                </h2>
            }
        >
            <Head title="Criar Ticket" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit} encType="multipart/form-data" method="POST">
                                <div>
                                    <InputLabel htmlFor="subject" value="Aluno" />
                                    <TextInput
                                        type='text'
                                        id='subject'
                                        value={data.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.subject} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="RA" value="RA" />
                                    <TextInput
                                        type='text'
                                        id='RA'
                                        value={data.RA}
                                        onChange={(e) => setData('RA', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.subject} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="recipients" value="Destinatários" />
                                    <TextInput
                                        type='text'
                                        id='recipients' 
                                        value={data.recipients}
                                        onChange={(e) => setData('recipients', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.recipients} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="uploaded_file" value="Escolha um arquivo:"/>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        id="uploaded_file"
                                        name="uploaded_file"
                                        required
                                    />
                                </div>

                                <PrimaryButton type="submit" disabled={processing}>
                                    Enviar
                                </PrimaryButton>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
