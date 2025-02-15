<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TicketsController;
use App\Http\Controllers\LinkController;
use App\Models\Tickets;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use database\migrations;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $tickets = Tickets::all();
    return Inertia::render('Dashboard', ['tickets' => $tickets]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/create-ticket', function () {
    return Inertia::render('CreateTicket');
})->middleware(['auth', 'verified'])->name('create-ticket');

Route::post('/tickets', [TicketsController::class, 'store'])->middleware(['auth', 'verified']);

Route::get('/ticket/{id}', [TicketsController::class, 'show']);
Route::get('/ticket/{id}/delete', [TicketsController::class, 'delete'])->name('ticket.delete');
Route::get('/ticket/{id}/confirm', [TicketsController::class, 'edit'])->name('edit');
Route::get('/confirmar/{token}', [LinkController::class, 'confirmar'])->name('confirmar');

Route::put('/tickets/{id}', [TicketsController::class, 'update'])->middleware(['auth', 'verified']);


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
