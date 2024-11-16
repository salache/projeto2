<?php

namespace App\Http\Controllers;

use App\Models\Tickets;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\TicketCreatedMail;

class TicketsController extends Controller
{
    public function store(Request $request)
    {
        // Validação dos dados
        $request->validate([
            'subject' => 'required|string|max:255',
            'recipients' => 'required|string|max:250',
            'uploaded_file' => 'required|file|max:10240',
        ]);

        // Criação do ticket
        Tickets::create([
            'subject' => $request->subject,
            'recipients' => $request->recipients,
            'status' => 'Aberto',
        ]);

        $file = $request->file('uploaded_file');

        Mail::to($request->recipients)->send(new TicketCreatedMail($file));

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
    public function show(Tickets $tickets)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tickets $tickets)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tickets $tickets)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tickets $tickets)
    {
        //
    }
}
