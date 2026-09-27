<?php

namespace App\Mail;

use App\Models\ContactMessage;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

/**
 * Notifies the admin inbox whenever a visitor submits POST /api/v1/contact.
 * ShouldQueue means ContactController::store() never waits on an SMTP round
 * trip before responding to the submitter.
 */
class NewContactMessageReceived extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(public ContactMessage $contactMessage) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'New contact message from '.$this->contactMessage->name,
        );
    }

    public function content(): Content
    {
        // $contactMessage reaches the view for free: Mailable::buildViewData()
        // exposes every public property of the mailable to the template.
        return new Content(
            markdown: 'mail.contact-received',
        );
    }
}
