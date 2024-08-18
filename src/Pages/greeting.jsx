export function getGreeting() {
    const hour = new Date().getHours();
    
    if (hour >= 3 && hour < 12) {
        return "Good morning User, I am Twilio and I will be your assistant today";
    } else if (hour >= 12 && hour < 18) {
        return "Good afternoon User, I am Twilio and I will be your assistant today";
    } else {
        return "Good evening User, I am Twilio and I will be your assistant today";
    }
}