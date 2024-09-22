import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import * as bootstrap from 'bootstrap';
import moment from 'moment';

@Component({
  selector: 'app-event-calendar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './event-calendar.component.html',
  styleUrl: './event-calendar.component.css',
})
export class EventCalendarComponent {
  calendarOptions: any;
  myModal: any;
  dangerAlert: any;
  close: any;
  calendar: any;
  myEvents: any[] = JSON.parse(localStorage.getItem('events')!) || [];

  ngOnInit() {
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
        this.selectedEvent = info.event; // Store the clicked event
        this.showDeleteModal(); // Show modal with delete option
      },
      eventDrop: (info: any) => this.updateEvent(info),
    });

    this.calendar.render();
  }

  // To generate unique event IDs
  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
  }

  // Update event when dragged or dropped
  updateEvent(info: any) {
    const eventIndex = this.myEvents.findIndex(
      (event) => event.id === info.event.id
    );
    const updatedEvent = {
      ...this.myEvents[eventIndex],
      start: moment(info.event.start).format('YYYY-MM-DD'),
      end: moment(info.event.end).format('YYYY-MM-DD'),
    };

    this.myEvents.splice(eventIndex, 1, updatedEvent);
    localStorage.setItem('events', JSON.stringify(this.myEvents));
  }

  editEvent(eventId: string) {
    const eventToEdit = this.myEvents.find((event) => event.id === eventId);
    if (eventToEdit) {
      this.showModal(eventToEdit); // Populate the modal with event data
    }
  }

  // Submit event form
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
      allDay: false,
    };

    this.myEvents.push(newEvent);
    this.calendar.addEvent(newEvent);
    localStorage.setItem('events', JSON.stringify(this.myEvents));

    this.myModal.hide();
  }

  showError(message: string) {
    this.dangerAlert = document.getElementById('dangerAlert');
    this.dangerAlert.innerText = message;
    this.dangerAlert.style.display = 'block';
  }

  showModal(event: any = null) {
    this.myModal = new bootstrap.Modal(document.getElementById('form')!);

    if (event) {
      // Get the elements and perform null checks
      const titleInput = document.getElementById(
        'title'
      ) as HTMLInputElement | null;
      const startDateInput = document.getElementById(
        'startDate'
      ) as HTMLInputElement | null;
      const endDateInput = document.getElementById(
        'endDate'
      ) as HTMLInputElement | null;
      const colorInput = document.getElementById(
        'color'
      ) as HTMLInputElement | null;

      // Only set the values if the elements exist
      if (titleInput) {
        titleInput.value = event.title;
      }
      if (startDateInput) {
        startDateInput.value = event.start;
      }
      if (endDateInput) {
        endDateInput.value = event.end;
      }
      if (colorInput) {
        colorInput.value = event.backgroundColor;
      }
    }

    this.myModal.show();
  }

  hideModal() {
    this.myModal.hide();
  }

  selectedEvent: any = null; // Store the clicked event

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
      // Remove event from calendar
      const event = this.calendar.getEventById(this.selectedEvent.id);
      if (event) {
        event.remove();
      }

      // Remove event from local storage
      const eventIndex = this.myEvents.findIndex(
        (event) => event.id === this.selectedEvent.id
      );
      if (eventIndex > -1) {
        this.myEvents.splice(eventIndex, 1); // Remove from array
        localStorage.setItem('events', JSON.stringify(this.myEvents)); // Update localStorage
      }

      // Hide modal
      this.myModal.hide();
      this.selectedEvent = null; // Clear the selected event
    }
  }
}
