<?php

namespace App\Http\Controllers;

use App\Tickets;
use Illuminate\Http\Request;

class TicketsController extends Controller
{
    public function tickets(Request $request)
    {
        $tickets = Tickets::select('id', 'subject', 'recipients', 'status', 'created_at', 'updated_at')->get();

        return inertia('Dashboard', [
            'tickets' => $tickets,
        ]);
    }
}