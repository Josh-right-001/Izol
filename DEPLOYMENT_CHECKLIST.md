# ISOLELE Vercel Deployment Checklist

## ✅ Pre-Deployment Phase

### Environment Setup
- [ ] Vercel account created
- [ ] GitHub repository connected
- [ ] Supabase project created
- [ ] Supabase database initialized
- [ ] All environment variables saved locally

### Code Review
- [ ] All code committed to Git
- [ ] No console.log statements left
- [ ] TypeScript compiles without errors
- [ ] All imports are correct
- [ ] ESLint passes

### Database
- [ ] Migration script created ✓
- [ ] Tables created in Supabase ✓
- [ ] Initial data inserted ✓
- [ ] Row Level Security enabled ✓
- [ ] Indexes created for performance ✓

---

## 🚀 Deployment Phase (First Time)

### Step 1: Vercel Project Setup
1. [ ] Go to https://vercel.com/dashboard
2. [ ] Click "Add New..." → "Project"
3. [ ] Select GitHub repository
4. [ ] Configure project name: "isolele"
5. [ ] Select Framework: "Next.js"
6. [ ] Build command: `npm run build`
7. [ ] Output directory: `.next`

### Step 2: Environment Variables in Vercel
1. [ ] Go to Project Settings → Environment Variables
2. [ ] Add all variables from `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `POSTGRES_URL` (if using direct DB connection)
3. [ ] Verify all variables are set for Production
4. [ ] Save changes

### Step 3: Initial Database Setup
1. [ ] Run initialization script locally:
   ```bash
   npm run init-db
   ```
2. [ ] Verify tables created in Supabase console
3. [ ] Check initial data inserted

### Step 4: First Deployment
1. [ ] Push code to GitHub main branch
2. [ ] Vercel automatically deploys
3. [ ] Check deployment logs for errors
4. [ ] Verify site is accessible

### Step 5: Post-Deployment Tests
1. [ ] Visit production URL
2. [ ] Check homepage loads
3. [ ] Verify images display
4. [ ] Test language switching
5. [ ] Check mobile responsiveness
6. [ ] Verify all pages accessible

---

## 🔄 Content Publishing Workflow

### Adding First Content

#### Add Characters
```bash
# Use Admin Dashboard or Supabase console
1. Add at least 5 characters
2. Verify images load
3. Check both languages
```

#### Add Products
```bash
1. Add at least 3 products
2. Set prices
3. Upload product images
4. Verify stock quantities
```

#### Add Articles
```bash
1. Create at least 2 articles
2. Set publication date
3. Upload featured images
4. Publish articles
```

### Homepage Configuration
- [ ] Update hero title (EN & FR)
- [ ] Update hero description (EN & FR)
- [ ] Set featured image
- [ ] Verify all sections populated

---

## 🔐 Security Verification

### Supabase
- [ ] Row Level Security enabled on all tables
- [ ] Public read access configured
- [ ] Service role key only in server env
- [ ] No sensitive data in client code
- [ ] Passwords hashed if applicable

### Vercel
- [ ] All secrets in Environment Variables
- [ ] No .env file committed to Git
- [ ] Secrets not visible in logs
- [ ] Production branch protection enabled
- [ ] Only authorized users can deploy

### Database
- [ ] Automated backups enabled
- [ ] Point-in-time recovery available
- [ ] Connection pooling configured
- [ ] SSL encryption enabled

---

## 📊 Performance Optimization

### Vercel
- [ ] Edge caching configured
- [ ] ISR (Incremental Static Regeneration) working
- [ ] Images optimized
- [ ] Bundle size < 500KB
- [ ] Lighthouse score > 90

### Supabase
- [ ] Indexes created on frequently queried fields
- [ ] Query performance monitored
- [ ] Connection limits set
- [ ] Read replicas configured (if needed)

### Images
- [ ] All images optimized
- [ ] WebP format used where possible
- [ ] Lazy loading enabled
- [ ] Alt text on all images
- [ ] Image size < 2MB

---

## 📈 Post-Deployment Monitoring

### First Week
- [ ] Monitor Vercel Analytics daily
- [ ] Check error logs
- [ ] Verify database performance
- [ ] Monitor uptime
- [ ] Test on various devices

### Ongoing
- [ ] Weekly analytics review
- [ ] Monthly backup verification
- [ ] Quarterly security audit
- [ ] Quarterly performance review

### Metrics to Track
- [ ] Page load time
- [ ] Core Web Vitals
- [ ] Error rate
- [ ] Database query time
- [ ] User engagement

---

## 📝 Documentation

### Before Going Live
- [ ] README.md updated ✓
- [ ] Deployment guide created ✓
- [ ] CMS guide created ✓
- [ ] API documentation created ✓
- [ ] Troubleshooting guide created ✓

### Team Knowledge
- [ ] Team trained on CMS
- [ ] Content management workflow documented
- [ ] Emergency procedures written
- [ ] Contact list created

---

## 🎯 Day 1 Live Checklist

### Morning (Before Launch)
- [ ] Final code review
- [ ] Database backup created
- [ ] All team members notified
- [ ] Monitoring tools ready
- [ ] Analytics tracked

### During Launch
- [ ] Site accessible from multiple locations
- [ ] DNS propagation verified
- [ ] SSL certificate valid
- [ ] Analytics receiving data
- [ ] Error tracking enabled

### After Launch
- [ ] Social media announcements
- [ ] Email to subscribers
- [ ] Press release sent
- [ ] Blog post published
- [ ] Customer support ready

---

## 🔧 Continuous Deployment Setup

### GitHub Integration
- [ ] Branch protection rules set
- [ ] Require pull request reviews
- [ ] Auto-deploy on merge
- [ ] Production deployments logged
- [ ] Rollback procedure documented

### Automated Testing
- [ ] Unit tests running
- [ ] Integration tests passing
- [ ] E2E tests configured
- [ ] Performance tests enabled
- [ ] Security scanning active

---

## 🚨 Disaster Recovery

### Backup Strategy
- [ ] Daily database backups ✓
- [ ] Weekly code backups
- [ ] Monthly comprehensive backup
- [ ] Backup verification weekly
- [ ] Restore procedure tested quarterly

### Rollback Procedure
- [ ] Previous deployment accessible
- [ ] Database rollback plan documented
- [ ] Communication plan ready
- [ ] Team trained on rollback
- [ ] Rollback tested monthly

---

## ✨ Final Verification

Before declaring "Ready for Production":

- [ ] All checklist items completed
- [ ] Site performs well
- [ ] Database is stable
- [ ] Team trained
- [ ] Documentation complete
- [ ] Monitoring active
- [ ] Support ready
- [ ] Backup verified

---

## 🎉 Launch Approved!

When all items checked:

```
Status: ✅ READY FOR PRODUCTION
Date: [Date]
Deployed by: [Name]
Verified by: [Name]
```

Welcome to ISOLELE on Vercel! 🚀
