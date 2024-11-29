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
    public $link;
    
    /**
     * Create a new message instance.
     *
     * @param UploadedFile $file
     */

    public function __construct(UploadedFile $file, $link = null)
    {
        $this->file = $file;
        $this->link = $link;
    }
    
    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $email = $this->view('emails.teste')
                      ->subject('Novo Ticket Criado')
                      ->with([
                          'link' => $this->link,
                      ]);

        if ($this->file) {
            $email->attach($this->file->getRealPath(), [
                'as' => $this->file->getClientOriginalName(),
                'mime' => $this->file->getMimeType(),
            ]);
        }

        return $email;
    }
}
