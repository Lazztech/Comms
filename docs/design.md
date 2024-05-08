# Comms by Lazztech Design Document

The objective of this project is fundementally to produce a convenient to deploy and use off grid communication tool. The intention is to expose a web app so that users may connect over a wifi access point with the smart phones they already have and share a two way radio located centrally to their base camp.

This would then allow for comms to be easily deployed and shared upon each base camp.

```mermaid
---
title: Comms Node (High Level)
---
flowchart LR;
    2way-radio;
    raspberry-pi;
    smartphone;
    uhf-vhf[\UHF/VHF\];
    aprs-cable[\3.5mm 4 pole APRS Cable\];
    wifi[\2.4gz WiFi AP\];
    2way-radio <--> aprs-cable;
    2way-radio <--> uhf-vhf;
    aprs-cable <--> raspberry-pi;
    raspberry-pi <--> wifi;
    wifi <--> smartphone;
```

```mermaid
---
title: Comms Basecamps
---
flowchart BT;
    commsNode1[Comms Node 1];
        node1user1[User];
        node1user2[User];
        node1user3[User];
        node1user1 <--> commsNode1;
        node1user2 <--> commsNode1;
        node1user3 <--> commsNode1;
    commsNode2[Comms Node 2];
        node2user1[User];
        node2user2[User];
        node2user3[User];
        node2user1 <--> commsNode2;
        node2user2 <--> commsNode2;
        node2user3 <--> commsNode2;
    commsNode3[Comms Node 3];
        node3user1[User];
        node3user2[User];
        node3user3[User];
        node3user1 <--> commsNode3;
        node3user2 <--> commsNode3;
        node3user3 <--> commsNode3;
    uhf-vhf[\UHF/VHF\];
    commsNode1 <--> uhf-vhf;
    commsNode2 <--> uhf-vhf;
    commsNode3 <--> uhf-vhf;
```

## Requirements

| # |  Category | Requirement |
| -------- | ------- | ------- |
| 1 | Hardware | must be portable |
| 2 | Hardware | must be powerable via usb |
| 3 | Hardware | must run for hours on a 10,000 mha battery bank |
| 4 | Hardware | must serve a 2.4Ghz wifi access point |
| x | Hardware | wifi access point must be reach 45 meters |
| x | Hardware | must be able to output and recieve audio to various 2 way radios |
| x | Hardware | must allow for wifi roaming |
| x | Hardware | must have sufficient storage space for multiple days worth of data and audio persistence |
| x | Server | must record audio sent and recieved via the 2 way radio |
| x | Server | must store timestamps for begining and end of 2 way radio audio recordings |
| x | Server | must be accessible via the hardware wifi access point's local area network |
| x | Server | must not require any access to the internet |
| x | Server | must persist data between power cycles |
| x | Server | must support web push notifications without the need of any external services |
| x | Server | must be able to push updates to the client |
| x | Server | must be able to transcribe audio recordings and persist the results |
| x | Client | must be accessible via iOS and Android web browsers |
| x | Client | must be installable as a progressive web app |
| x | Client | must be able to recieve and update the UI upon server side pushed data |
| x | Client | must be able to recieve web push notifications |
| x | Client | must be resiliant to momentary connectivity losses with the server |
| x | Client | must be able to gracefully handle wifi roaming between servers |
| x | x |  |


## Networking

- wifi roaming
- connect to AP via nfc
- connect to AP via qr code

```mermaid
---
title: Comms Nodes Networking
---
flowchart BT;
    commsNode1[Node 1 - Network Name SSID: CommsNode];
    commsNode2[Node 2 - Network Name SSID: CommsNode];
    commsNode3[Node ... - Network Name SSID: CommsNode];
    node1user1[Smartphone User - WiFi Roaming];
    node1user2[Smartphone User - WiFi Roaming];
    node1user1 <--> commsNode1;
    node1user1 <--> commsNode2;
    node1user2 <--> commsNode2;
    node1user2 <--> commsNode3;
```
Links:
- https://www.reddit.com/r/HomeNetworking/comments/hxal50/multiple_access_points_with_the_same_ssid/

## Hardware

Fundementally there are 3 components to setting up a "Comms Node", a computer with WiFi that can serve an access point, a 2 way radio, and a means of wiring the radio as an audio input/output device to the computer.

#### P.O.C. Setup:
- TIDRADIO TD-H3 GMRS Radio https://a.co/d/cGzM4UL
- K type APRS Cable https://a.co/d/e2LOQvZ

## Backend

https://docs.nestjs.com/

#### Transcription:
- https://github.com/ariym/whisper-node

## Notifications

https://docs.nestjs.com/techniques/server-sent-events
https://medium.com/@dnyaneshwarsukashe/implementing-web-push-notifications-in-angular-and-nestjs-4d33a8e14af5

## Frontend

https://nextjs.org/