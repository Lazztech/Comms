# Comms by Lazztech Software Requirements Specifications

| # |  Category | Requirement |
| -------- | ------- | ------- |
| 1 | Hardware | must be portable |
| 2 | Hardware | must be powerable via usb |
| 3 | Hardware | must run for hours on a 10,000 mha battery bank |
| 4 | Hardware | must serve a 2.4Ghz wifi access point |
| 5 | Hardware | wifi access point must be reach 45 meters |
| 6 | Hardware | must be able to output and recieve audio to various 2 way radios |
| 7 | Hardware | must allow for wifi roaming |
| 8 | Hardware | must have sufficient storage space for multiple days worth of data and audio persistence |
| 9 | Server | must record audio sent and recieved via the 2 way radio |
| 10 | Server | must be able to stream audio recordings |
| 11 | Server | must be able to serve a stream of live inbound and outbound audio |
| 12 | Server | must store timestamps for begining and end of 2 way radio audio recordings |
| 13 | Server | must be accessible via the hardware wifi access point's local area network |
| 14 | Server | must not require any access to the internet |
| 15 | Server | must persist data between power cycles |
| 16 | Server | must support web push notifications without the need of any external services |
| 17 | Server | must be able to push updates to the client |
| 18 | Server | must be able to transcribe audio recordings and persist the results |
| 19 | Client | must be accessible via iOS and Android web browsers |
| 20 | Client | must be installable as a progressive web app |
| 21 | Client | must be able to recieve and update the UI upon server side pushed data |
| 22 | Client | must be able to recieve web push notifications |
| 23 | Client | must be resiliant to momentary connectivity losses with the server |
| 24 | Client | must be able to gracefully handle wifi roaming between servers |
| 25 | Client | must maintain interactivity when offline |
| 26 | Client | must be able to play live audio stream of incoming audio messages |
| 27 | Client | must be able to record and send audio messages to the server for broadcast |
| 28 | Client | must show a timeline of sent and recieved audio messages |
| 29 | Client | must show transcriptions of sent and recieved audio messages |
| 30 | Client | must be able to replay sent and recieved audio messages |
| 31 | Client | must show duration of audio messages |
| 32 | Client | must show date/time stamps of audio messages |
| 33 | Client | must show date labels dividing audio message timeline |