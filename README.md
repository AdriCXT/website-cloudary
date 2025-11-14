<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=28&pause=1000&color=0082C9&center=true&vCenter=true&width=500&lines=Cloudary+Intranet;Intern+Only;Nextcloud+%26+Server+Hub" alt="Cloudary Intranet" />
</div>

<div align="center">
  <img src="https://img.shields.io/badge/Nextcloud-0082C9?style=for-the-badge&logo=nextcloud&logoColor=white" alt="Nextcloud" />
  <img src="https://img.shields.io/badge/Server_Dashboard-4CAF50?style=for-the-badge&logo=server&logoColor=white" alt="Server Dashboard" />
  <img src="https://img.shields.io/badge/Admins-Arien%26Adri-FF5722?style=for-the-badge&logo=users&logoColor=white" alt="Projektleitung" />
  <img src="https://img.shields.io/github/last-commit/adricxt/website-cloudary?style=for-the-badge&color=0082C9&logo=git&logoColor=white" alt="Zuletzt bearbeitet" />
</div>

## site.cloudary.de

## Services im Intranet

| Service             | Beschreibung                                      |
|---------------------|---------------------------------------------------|
| **Nextcloud**       | Zentrale Dateiablage, Kalender, Kontakte, Kollaboration |
| **Server Dashboard**| Live-Überwachung: CPU, RAM, Festplatte, Logs, Alerts |
| **Projekte**        | Kanban-Boards, Aufgaben, Meilensteine             |
| **Chat**            | Echtzeit-Teamkommunikation                        |

> **Login**: Mit deinem Zugangspasswort         

> **Support**: `webmaster@cloudary.de`

## Architektur (Nextcloud ↔ Server)

```mermaid
graph LR
    A[Frontend: React + Tailwind] --> B[Backend: Node.js/Express]
    B --> C[(MongoDB)]
    B --> D[Nextcloud API]
    B --> E[Server Monitoring]
    D --- F[Nextcloud Service]
    E --- G[Server Dashboard]
    H[VPN Only] --> A
    style D fill:#0082C9,stroke:#0082C9
    style F fill:#0082C9,stroke:#0082C9
    style E fill:#4CAF50,stroke:#4CAF50
    style G fill:#4CAF50,stroke:#4CAF50
    style H fill:#FF5722,stroke:#FF5722
