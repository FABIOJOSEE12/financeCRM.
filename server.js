const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const clientRoutes = require('./routes/clientRoutes');
const financeRoutes = require('./routes/financeRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const profileRoutes = require('./routes/profileRoutes');
const adminRoutes = require('./routes/adminRoutes'); // New admin routes

// Load env vars
dotenv.config();

const app = express();

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// EJS Setup
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout', 'layout'); 

// Session
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hours
}));

// Flash messages
app.use(flash());

// Global vars and User loader
const User = require('./models/User'); // Ensure User model is required

app.use(async (req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    
    if (req.session.userId) {
        try {
            // Fetch fresh user data including avatar for every request
            const user = await User.findById(req.session.userId);
            if (user) {
                // Extract first name
                user.firstName = user.name.split(' ')[0];
            }
            res.locals.user = user;
        } catch (err) {
            console.error('Error fetching user for layout:', err);
            res.locals.user = null;
        }
    } else {
        res.locals.user = null;
    }
    next();
});

// Routes
app.use((req, res, next) => {
    console.log(`[REQUEST] ${req.method} ${req.url}`);
    next();
});

console.log('Registering routes...');
app.use('/', authRoutes);
app.use('/clients', clientRoutes);
app.use('/finance', financeRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/profile', profileRoutes);
app.use('/admin', adminRoutes); // Register admin routes

// Dashboard redirect
app.get('/', (req, res) => {
    res.redirect('/dashboard');
});

// 404
app.use((req, res) => {
    res.status(404).render('404', { layout: false } ); // Create a simple 404 later or just text
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
