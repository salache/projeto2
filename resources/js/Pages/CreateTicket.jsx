import InputLabel from '@/Components/InputLabel';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function CreateTicket() {
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
                            <form>
                                <div>
                                    <InputLabel htmlFor="" value="Título"></InputLabel>
                                    <TextInput
                                        name='Título' />
                                </div>
                                <div>
                                    <InputLabel htmlFor="" value="Destinatários"></InputLabel>
                                    <TextInput
                                        name='Destinatários' />
                                </div>
                                <div>
                                    <InputLabel htmlFor="" value="Assunto"></InputLabel>
                                    <TextInput
                                        name='Assunto'
                                        multiline
                                    />
                                </div>
                                <PrimaryButton>
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