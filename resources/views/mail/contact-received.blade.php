<x-mail::message>
# New contact message

**Name:** {{ $contactMessage->name }}
**Email:** {{ $contactMessage->email }}
@if($contactMessage->service)
**Service:** {{ $contactMessage->service }}
@endif
@if($contactMessage->budget)
**Budget:** {{ $contactMessage->budget }}
@endif

**Message:**

{{ $contactMessage->message }}

Received {{ $contactMessage->created_at->toDayDateTimeString() }}.
</x-mail::message>
