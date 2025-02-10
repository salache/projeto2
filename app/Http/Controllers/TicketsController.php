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
        $request->validate([
            'subject' => 'required|string|max:255',
            'RA' => 'required|string|max:10',
            'recipients' => 'required|string|max:250',
            'uploaded_file' => 'required|file|max:10240',
        ]);

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

        $path = $file->store('uploads/tickets', 'public');
        $ticket->file_path = $path;
        $ticket->save();
        $link = (new LinkController())->gerarLink($ticketId);

        //Mail::to($request->recipients)->send(new TicketCreatedMail($file, $link));

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
    $ticket = Tickets::findOrFail($id);

    return Inertia::render('Ticket', [
        'ticket' => $ticket
    ]);
}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
{
    $ticket = Tickets::findOrFail($id);

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
