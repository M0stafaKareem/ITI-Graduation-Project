<?php
// app/Console/Commands/DailyEventReminder.php

namespace app\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Event;
use Illuminate\Support\Facades\Mail;
use App\Mail\EventReminder;
use App\Models\User;

class DailyEventReminder extends Command
{
    protected $signature = 'events:reminder';
    protected $description = 'Send email reminders for upcoming events';

    public function handle()
    {
        //console log
        //console log
        $console = new \Symfony\Component\Console\Output\ConsoleOutput( );
        $console->write('Sending email reminders for upcoming events...');
        // $today = today();
        // $tomorrow = $today->addDay();

        // $events = Event::whereBetween('start', [$today, $tomorrow])->get();

        // foreach ($events as $event) {
        //     // Send email reminder for the event
        //     Mail::to(user::all())->send(new EventReminder($event));
        // }
    }
}