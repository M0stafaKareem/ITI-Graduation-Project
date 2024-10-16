<?php

use App\Mail\EventReminder;
use App\Models\User;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use App\Models\Event;

// Artisan::command('events:reminder', function () {
    
//     $console = new \Symfony\Component\Console\Output\ConsoleOutput( );
//     $console->write('Sending email reminders for upcoming events...');
//     //console log


// } 

// )->purpose('Display an inspiring quote');


Schedule::call(function () {
        $console = new \Symfony\Component\Console\Output\ConsoleOutput( );
        $console->write('Sending email reminders for upcoming events...');
        $today = today()->subDays(2);
        $tomorrow = today()->addDays(2);
        $console->write(  'from '.$today .' to '.$tomorrow);
        $events = Event::whereBetween('start', [$today, $tomorrow])->get();
        $console->write(  $events);
        foreach ($events as $event) {
            // Send email reminder for the event
            Mail::to(User::all())->send(new EventReminder($event));
        }
})->daily();

