<?php

namespace App\Http\Controllers;

use App\Models\Tickets;
use Illuminate\Http\Request;

class TicketsController extends Controller
{
    public function store(Request $request)
    {
        // Validação dos dados
        $request->validate([
            'subject' => 'required|string|max:255',
            'recipients' => 'required|string|max:250',
        ]);

        // Criação do ticket
        Tickets::create([
            'subject' => $request->subject,
            'recipients' => $request->recipients,
            'status' => 'Aberto',
        ]);

        // Redirecionar ou retornar resposta
        return redirect()->route('dashboard')->with('success', 'Ticket criado com sucesso!');
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
