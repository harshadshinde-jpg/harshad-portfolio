export const dadJokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs.",
  "I told my team I had a 10-year roadmap. They asked if it was prioritised. I said the roadmap itself was still in discovery.",
  "A PM walks into a bar. The bartender asks 'what'll it be?' The PM says 'let me just validate that with a few users first.'",
  "Why do seagulls fly over the sea? Because if they flew over the bay, they'd be bagels.",
  "A photon checks into a hotel. The bellhop asks 'Can I help you with your luggage?' The photon says 'No thanks, I'm travelling light.'",
  "Why did the scarecrow win an award? Because he was outstanding in his field.",
  "I told my engineer I had a great idea. He said 'put it in Jira.' It's still there. Priority: Medium.",
  "What do you call a fish without eyes? A fsh.",
  "I told my wife she was drawing her eyebrows too high. She looked surprised.",
  "Why did the bicycle fall over? Because it was two-tired. (Much like a PM at end of sprint.)",
  "I tried to make a joke about Agile. It's still in progress.",
  "What's a PM's favourite type of music? Heavy metal — because of all the hard deadlines.",
  "Why did the PM bring a ladder to the meeting? Because they heard the stakes were high.",
  "I asked my product team for a joke. They said it's in the backlog, estimated Q3.",
  "What do you call a PM who can code? Overqualified, apparently.",
];

export function getRandomJoke(): string {
  return dadJokes[Math.floor(Math.random() * dadJokes.length)];
}
