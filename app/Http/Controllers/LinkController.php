<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\Tickets;
use Inertia\Inertia;
use DB;

class LinkController extends Controller
{
    public function gerarLink($ticketId)
    {
        $token = Str::random(60);
        
        $ticket = Tickets::find($ticketId); 

        if ($ticket) {
            $ticket->token = $token;
            $ticket->save();
        }

        $link = route('confirmar', ['token' => $token]);

        return $link;
    }

    public function confirmar($token)
    {
        $registro = DB::table('tickets')->where('token', $token)->first();

        if (!$registro) {
            return redirect()->route('/dashboard')->with('error', 'Link inválido!');
        }

        $ticket = Tickets::find($registro->id); 
        $ticket->confirm = true;
        $ticket->save();

        return redirect()->route('dashboard')->with('success', 'Sua confirmação foi realizada com sucesso!');
    }
}