<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Http\UploadedFile;

class TicketCreatedMail extends Mailable
{
    use Queueable, SerializesModels;

    public $file;
    
    /**
     * Create a new message instance.
     *
     * @param UploadedFile $file Arquivo que será anexado
     */

    public function __construct(UploadedFile $file)
    {
        $this->file = $file;
    }
    
    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        if ($this->file) {
            return $this->view('emails.teste')
                        ->subject('Novo Ticket Criado')
                        ->attach($this->file->getRealPath(), [
                            'as' => $this->file->getClientOriginalName(),
                            'mime' => $this->file->getMimeType(),
                        ]);
        } else {
            // Caso não haja arquivo, envia apenas o e-mail sem anexo
            return $this->view('emails.teste')
                        ->subject('Novo Ticket Criado');
        }
    }
}
