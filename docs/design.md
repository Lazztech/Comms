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

## Hardware

## Frontend

## Backend

## Appendix