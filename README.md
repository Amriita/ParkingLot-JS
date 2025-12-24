# 🅿️ Parking Lot – Low Level Design (JavaScript)

A clean, extensible, and interview-ready **Low Level Design (LLD)** implementation of a **Parking Lot System** using **JavaScript (Node.js)**.  
Designed following **Clean Architecture**, **SOLID principles**, and common **SDE-2 interview expectations**.

---

## 📌 Overview

The goal of this project is to demonstrate how to design a real-world system by clearly separating:

- Domain logic  
- Business use cases  
- Persistence concerns  
- External integrations  

The system supports **Admin**, **Entry**, and **Exit** workflows and can be easily extended for APIs or database integration.

---

## ✨ Key Highlights

- Clean Architecture (Controller → Service → Repository)
- Proper separation of concerns
- Domain-driven design (DDD – lite)
- Adapter pattern for payment integration
- Constructor-based dependency injection
- Fully runnable end-to-end simulation

---

## 🧩 Use Cases

### 👨‍💼 Admin Use Cases
- Add parking floors
- Add parking slots
- Update pricing rules (Hourly / Flat)

### 🚗 Entry Use Case
- Allocate an available parking slot
- Generate a parking ticket
- Persist ticket details

### 🚦 Exit Use Case
- Validate ticket
- Calculate parking fee
- Process payment (with retry logic)
- Release parking slot
- Generate receipt

---

## 🧠 Design Principles Applied

- Single Responsibility Principle (SRP)
- Dependency Inversion Principle (DIP)
- Open/Closed Principle
- Repository Pattern
- Adapter Pattern
- Loose coupling with dependency injection

Each layer has a **single, well-defined responsibility**, making the system scalable and testable.

---

## 🗂️ Project Structure

```txt
src/
├── parkingLotSimulation.js   // Composition Root (Main Runner)
│
├── controllers/
│   ├── EntryController.js
│   ├── ExitController.js
│   └── AdminController.js
│
├── services/
│   ├── SlotService.js
│   ├── TicketService.js
│   ├── PricingService.js
│   ├── PaymentService.js
│   ├── ReceiptService.js
│   └── AdminService.js
│
├── repositories/
│   ├── TicketRepository.js
│   ├── SlotRepository.js
│   ├── FloorRepository.js
│   ├── PricingRuleRepository.js
│   └── PaymentRepository.js
│
├── domain/
│   ├── vehicle/
│   │   ├── Vehicle.js
│   │   └── VehicleType.js
│   │
│   ├── parking/
│   │   ├── Floor.js
│   │   └── ParkingSlot.js
│   │
│   ├── ticket/
│   │   └── Ticket.js
│   │
│   ├── billing/
│   │   ├── PricingRule.js
│   │   ├── Payment.js
│   │   └── Receipt.js
│   │
│   └── results/
│       ├── EntryResult.js
│       └── ExitResult.js
│
└── adapters/
    ├── PaymentGatewayAdapter.js
    └── RazorpayAdapter.js

---

## 🔄 High-Level Flow
### 🏢 Admin Flow
AdminController
 → AdminService
 → FloorRepository / SlotRepository / PricingRuleRepository

### 🚗 Entry Flow
EntryController
 → SlotService.allocateSlot()
 → TicketService.generateTicket()
 → TicketRepository.save()
 → EntryResult

### 🚦 Exit Flow
ExitController
 → TicketRepository.findById()
 → PricingService.calculate()
 → PaymentService.processPayment() (with retries)
 → SlotRepository.release()
 → ReceiptService.generate()
 → ExitResult

---

## 💰 Pricing Strategy

| Type | Formula | Description |
|------|----------|-------------|
| HOURLY | `ceil(hours) × rate` | Charges based on number of hours |
| FLAT | `fixed amount` | Flat rate regardless of time |

Pricing rules are modeled as **domain objects** and managed via **repositories**, keeping pricing logic isolated and configurable.

---

## 💳 Payment Integration

- Adapter Pattern used for external payment systems  
- Mocked **RazorpayAdapter** implementation  
- Built-in **retry logic** for failures  
- Easy to extend or replace gateway integrations  

---

## ▶️ How to Run

# Clone the repository
   git clone https://github.com/Amriita/ParkingLot-JS.git

# Move into the project
   cd ParkingLot-JS

# Run the simulation
   node src/parkingLotSimulation.js

---

## 🧪 Scenarios You Can Test

- Multiple vehicle entries  
- Slot exhaustion  
- Pricing rule updates  
- Payment failure with retry logic  
- End-to-end flow validation  

---

## 🚀 Future Enhancements

- REST APIs using **Express.js**  
- Database integration (**MySQL / MongoDB**)  
- Concurrency handling  
- Slot allocation strategies  
- Unit testing  
- UML / LLD diagrams  

---

## 👩‍💻 Author

**Amrita**  
Backend Software Engineer (Node.js)  
Focus: Building strong **System Design** fundamentals  

---
