<?php

namespace App\Http\Controllers;

use App\Models\Tickets;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\TicketCreatedMail;
use Inertia\Inertia;

class TicketsController extends Controller
{
    public function store(Request $request)
    {
        // Validação dos dados
        $request->validate([
            'subject' => 'required|string|max:255',
            'RA' => 'required|string|max:10',
            'recipients' => 'required|string|max:250',
            'uploaded_file' => 'required|file|max:10240',
        ]);

        // Criação do ticket
        $ticket = Tickets::create([
            'subject' => $request->subject,
            'RA' => $request->RA,
            'recipients' => $request->recipients,
            'professor' => '',
            'status' => 'Aberto',
            'confirm' => false,
            'token' => 'null',
        ]);

        $ticketId = $ticket->id;

        $file = $request->file('uploaded_file');

        $link = (new LinkController())->gerarLink($ticketId);

        Mail::to($request->recipients)->send(new TicketCreatedMail($file, $link));

        // Redirecionar ou retornar resposta
        return redirect()->route('dashboard');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
{
    // Encontre o ticket com base no ID
    $ticket = Tickets::findOrFail($id);

    // Retorne a página com os dados do ticket usando Inertia
    return Inertia::render('Ticket', [
        'ticket' => $ticket
    ]);
}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
{
    // Buscar o ticket pelo ID
    $ticket = Tickets::findOrFail($id);

    // Passar os dados para a página de edição via Inertia
    return Inertia::render('ConfirmTicket', [
        'ticket' => $ticket,
    ]);
}


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
{
    $ticket = Tickets::findOrFail($id);
    $ticket->professor = $request->professor;
    $ticket->confirm = $request->confirm;
    $ticket->status = 'Validado';

    $ticket->save();

    return redirect()->route('dashboard')->with('message', 'Ticket confirmado com sucesso!');
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tickets $tickets)
    {
        //
    }

    public function delete($id)
{
    $ticket = Tickets::find($id);
    if ($ticket) {
        $ticket->delete();
    }

    return redirect()->route('dashboard')->with('message', 'Ticket excluído com sucesso!');
}

}
