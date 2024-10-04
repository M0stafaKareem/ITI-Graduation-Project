import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import * as bootstrap from 'bootstrap';
import moment from 'moment';
import { CalendarEventsService } from '../../shared/services/calendar-events.service'; // Import service

@Component({
  selector: 'app-event-calendar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './event-calendar.component.html',
  styleUrl: './event-calendar.component.css',
})
export class EventCalendarComponent implements OnInit {
  calendarOptions: any;
  myModal: any;
  dangerAlert: any;
  close: any;
  calendar: any;
  myEvents: any[] = [];
  selectedEvent: any = null;

  constructor(private eventsService: CalendarEventsService) {} // Inject service

  ngOnInit() {
    this.loadEvents();
  }

  // Fetch events from the database
  loadEvents() {
    this.eventsService.loadEvents().subscribe((events) => {
      this.myEvents = JSON.parse(JSON.stringify(events));

      this.calendar?.removeAllEvents(); // Clear previous events
      this.calendar?.addEventSource(this.myEvents);
      // Add events from the database
      console.log(this.myEvents);
    });
    this.initCalendar();
  }

  initCalendar() {
    const calendarEl: HTMLElement = document.getElementById('calendar')!;

    this.calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, interactionPlugin],
      customButtons: {
        customButton: {
          text: 'Add Event',
          click: () => {
            this.showModal(); // Show modal to add an event
          },
        },
      },
      headerToolbar: {
        center: 'customButton',
        right: 'today, prev,next',
      },
      editable: true,
      selectable: true,
      unselectAuto: false,
      displayEventTime: false,
      events: this.myEvents,
      eventClick: (info: any) => {
        this.selectedEvent = info.event;
        this.showDeleteModal();
      },
      eventDrop: (info: any) => this.updateEvent(info),
    });

    this.calendar.render();
    console.log(this.calendar);
  }

  // To generate unique event IDs
  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
  }

  updateEvent(info: any) {
    const updatedEvent = {
      id: info.event.id,
      start: moment(info.event.start).format('YYYY-MM-DD'),
      end: moment(info.event.end).format('YYYY-MM-DD'),
    };

    this.eventsService.updateEvent(updatedEvent);
  }

  onSubmitEvent(formValues: any) {
    if (!formValues.title || !formValues.startDate || !formValues.endDate) {
      this.showError('Please fill in all the required fields.');
      return;
    }

    if (moment(formValues.endDate).isBefore(formValues.startDate)) {
      this.showError('End date cannot be before the start date.');
      return;
    }

    const newEvent = {
      id: this.uuidv4(),
      title: formValues.title,
      start: formValues.startDate,
      end: moment(formValues.endDate).add(1, 'day').format('YYYY-MM-DD'),
      backgroundColor: formValues.color,
      description: formValues.description,
      allDay: false,
    };

    this.myEvents.push(newEvent);
    this.calendar.addEvent(newEvent);

    this.eventsService.createEvent(newEvent).subscribe((response: any) => {
      this.loadEvents(); // Fetch the updated events from the server
    });
    this.myModal.hide();
  }

  showError(message: string) {
    this.dangerAlert = document.getElementById('dangerAlert');
    this.dangerAlert.innerText = message;
    this.dangerAlert.style.display = 'block';
  }

  // Show modal to add or edit an event
  showModal(event: any = null) {
    this.myModal = new bootstrap.Modal(document.getElementById('form')!);

    if (event) {
      // Populate the modal with event data
      const titleInput = document.getElementById(
        'event-title'
      ) as HTMLInputElement;
      const startDateInput = document.getElementById(
        'start-date'
      ) as HTMLInputElement;
      const endDateInput = document.getElementById(
        'end-date'
      ) as HTMLInputElement;
      const colorInput = document.getElementById(
        'event-color'
      ) as HTMLInputElement;
      const descriptionInput = document.getElementById(
        'description'
      ) as HTMLInputElement;

      titleInput.value = event.title;
      startDateInput.value = event.startDate;
      endDateInput.value = event.endDate;
      colorInput.value = event.backgroundColor;
      descriptionInput.value = event.description;
    }

    this.myModal.show();
  }

  hideModal() {
    this.myModal.hide();
  }

  // Show modal to confirm event deletion
  showDeleteModal() {
    this.myModal = new bootstrap.Modal(
      document.getElementById('deleteEventModal')!
    );
    this.myModal.show();
  }

  // Delete the selected event
  deleteSelectedEvent() {
    if (this.selectedEvent) {
      const event = this.calendar.getEventById(this.selectedEvent.id);
      if (event) {
        event.remove(); // Remove event from calendar
      }

      this.eventsService.deleteEvent(this.selectedEvent); // Delete from database

      // Remove event from local array
      const eventIndex = this.myEvents.findIndex(
        (event) => event.id === this.selectedEvent.id
      );
      if (eventIndex > -1) {
        this.myEvents.splice(eventIndex, 1); // Remove from array
      }

      // Hide modal
      this.myModal.hide();
      this.selectedEvent = null; // Clear the selected event
    }
  }
}
