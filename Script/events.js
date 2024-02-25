// Author            : Addan Zahra and Rojauhn Noble
// Student ID        : 100883421   ||  100849533
// Date of Completion: February 24, 2024

// function to display events using ajax and/or jquery as per requirements, anf formating it
$(document).ready(function () {
    $.getJSON("./Data/events.json", function (data) {
        const eventsContainer = $("#eventsContainer");

        $.each(data.events, function (index, event) {
            const eventHtml = `
                <div class="row row-striped">
                    <div class="col-2 text-right">
                        <div class="date-box">
                            <h1 class="display-4"><span class="badge badge-secondary"><br>${event.date.substring(8)}</span></h1>
                            <h2>${event.date.substring(5, 7)}<br></h2>
                        </div>
                    </div>
                    <div class="col-10">
                        <h3 class="text-uppercase"><strong>${event.title}</strong></h3>
                        <ul class="list-inline">
                            <li class="list-inline-item"><i class="fa fa-calendar-o" aria-hidden="true"></i> ${event.day}</li>
                            <li class="list-inline-item"><i class="fa fa-clock-o" aria-hidden="true"></i> ${event.time}</li>
                            <li class="list-inline-item"><i class="fa fa-location-arrow" aria-hidden="true"></i> ${event.location}</li>
                        </ul>
                        <p>${event.description}</p>
                    </div>
                </div>
                <br>`;
            eventsContainer.append(eventHtml);
        });
    });
});
