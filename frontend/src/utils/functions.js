export function getNextOccurrences(dayOfWeek, numOccurrences) {
    const days = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
    const shortDays = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];

    // Get the current date
    const currentDate = new Date();

    // Get the current day of the week
    const currentDayIndex = currentDate.getDay();

    // Get the index of the given day
    const givenDayIndex = days.indexOf(dayOfWeek);

    // Calculate the difference in days to the next occurrence of the given day
    let daysToAdd = givenDayIndex - currentDayIndex;
    if (daysToAdd <= 0) {
        daysToAdd += 7; // Add 7 days to reach the next occurrence
    }

    // Create an array to store the next occurrences
    const nextOccurrences = [];

    // Calculate the next n occurrences
    for (let i = 0; i < numOccurrences; i++) {
        // Create a new date by adding the calculated days
        const nextDate = new Date(currentDate);
        nextDate.setDate(currentDate.getDate() + daysToAdd + i * 7);

        // Format the date string
        const formattedDate = `${shortDays[nextDate.getDay()]} ${nextDate.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' })}`;

        // Add the formatted date to the array
        nextOccurrences.push(formattedDate);
    }

    return nextOccurrences;
}