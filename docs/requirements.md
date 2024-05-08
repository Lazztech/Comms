# Comms by Lazztech Requirements

## Hardware Requirements

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

## Server Requirements

| # |  Category | Requirement |
| -------- | ------- | ------- |
| 1 | Server | must record audio sent and recieved via the 2 way radio |
| 2 | Server | must be able to stream audio recordings |
| 3 | Server | must be able to serve a stream of live inbound and outbound audio |
| 4 | Server | must store timestamps for begining and end of 2 way radio audio recordings |
| 5 | Server | must be accessible via the hardware wifi access point's local area network |
| 6 | Server | must not require any access to the internet |
| 7 | Server | must persist data between power cycles |
| 8 | Server | must support web push notifications without the need of any external services |
| 9 | Server | must send a web push notification with a link on each message recieved and sent |
| 10 | Server | must be able to push updates to the client |
| 11 | Server | must be able to transcribe audio recordings and persist the results |
| 12 | Server | must be deployable via a docker container |

## Client Requirements

| # |  Category | Requirement |
| -------- | ------- | ------- |
| 1 | Client | must be accessible via iOS and Android web browsers |
| 2 | Client | must be installable as a progressive web app |
| 3 | Client | must be able to recieve and update the UI upon server side pushed data |
| 4 | Client | must be able to recieve web push notifications |
| 5 | Client | must be resiliant to momentary connectivity losses with the server |
| 6 | Client | must be able to gracefully handle wifi roaming between servers |
| 7 | Client | must maintain interactivity when offline |
| 8 | Client | must be able to play live audio stream of incoming audio messages |
| 9 | Client | must be able to record and send audio messages to the server for broadcast |
| 10 | Client | must show a timeline of sent and recieved audio messages |
| 11 | Client | must show transcriptions of sent and recieved audio messages |
| 12 | Client | must be able to replay sent and recieved audio messages |
| 13 | Client | must show duration of audio messages |
| 14 | Client | must show date/time stamps of audio messages |
| 15 | Client | must show date labels dividing audio message timeline |