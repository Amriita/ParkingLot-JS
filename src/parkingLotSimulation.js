// parkingLotSimulation.js

console.log('🚀 Parking Lot Simulation Started');

// ---------- Repositories ----------
const FloorRepository = require('./repositories/FloorRepository');
const SlotRepository = require('./repositories/SlotRepository');
const TicketRepository = require('./repositories/TicketRepository');
const PricingRuleRepository = require('./repositories/PricingRuleRepository');
const PaymentRepository = require('./repositories/PaymentRepository');

// ---------- Services ----------
const SlotService = require('./services/SlotService');
const TicketService = require('./services/TicketService');
const PricingService = require('./services/PricingService');
const PaymentService = require('./services/PaymentService');
const ReceiptService = require('./services/ReceiptService');
const AdminService = require('./services/AdminService');

// ---------- Controllers ----------
const EntryController = require('./controllers/EntryController');
const ExitController = require('./controllers/ExitController');
const AdminController = require('./controllers/AdminController');

// ---------- Adapters ----------
const RazorpayAdapter = require('./adapters/RazorpayAdapter');

// ---------- Domain ----------
const VehicleType = require('./domain/vehicle/VechileType');
const Vehicle = require('./domain/vehicle/Vechile');

// ================== DEPENDENCY WIRING ==================
console.log('\n🔧 Wiring dependencies...');

const floorRepository = new FloorRepository();
const slotRepository = new SlotRepository();
const ticketRepository = new TicketRepository();
const pricingRuleRepository = new PricingRuleRepository();
const paymentRepository = new PaymentRepository();

const slotService = new SlotService(slotRepository);
const ticketService = new TicketService();
const pricingService = new PricingService(pricingRuleRepository);

const paymentGateway = new RazorpayAdapter();
const paymentService = new PaymentService(paymentGateway, paymentRepository);
const receiptService = new ReceiptService();

const adminService = new AdminService(
  floorRepository,
  slotRepository,
  pricingRuleRepository
);


const entryController = new EntryController(
  slotService,
  ticketService,
  ticketRepository
);

const exitController = new ExitController(ticketRepository,
  slotRepository,
  pricingService,
  paymentService,
  receiptService);
const adminController = new AdminController(adminService);

console.log('✅ Dependency wiring completed');

// ================== ADMIN FLOW ==================
console.log('\n========== 🛠 ADMIN FLOW ==========');

console.log('➡️ Adding floors...');
adminController.addFloor(1);
adminController.addFloor(2);

console.log('➡️ Adding parking slots...');
adminController.addSlot(1, 'CAR');
adminController.addSlot(1, 'CAR');
adminController.addSlot(2, 'CAR');

console.log('➡️ Updating pricing...');
adminController.updatePricing('CAR', 'HOURLY', 50);

console.log('✅ Admin setup completed');

// ================== ENTRY FLOW ==================
console.log('\n========== 🚗 ENTRY FLOW ==========');

const car = new Vehicle('V1', 'KA-01-1234', VehicleType.CAR);
console.log('🚘 Vehicle arrived:', car);

const entryResult = entryController.enterVehicle(car);
console.log('🎟 Entry Result:', entryResult);

if (!entryResult.success) {
  console.log('❌ Entry failed. No slot available.');
  process.exit(0);
}

const ticketId = entryResult.data.ticket.id;
console.log('🧾 Ticket issued with ID:', ticketId);

// ================== EXIT FLOW ==================
setTimeout(() => {
  console.log('\n========== 🚦 EXIT FLOW ==========');
  console.log('➡️ Vehicle exiting with ticket:', ticketId);

  const exitResult = exitController.exitVehicle(ticketId);
  console.log('🧾 Exit Result:', exitResult);

  console.log('\n🏁 Parking Lot Simulation Completed');
}, 2000);
