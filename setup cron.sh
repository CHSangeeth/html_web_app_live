#!/bin/bash

# This script helps set up a cron job to keep your Node.js application running
# For shared hosts that might automatically stop inactive processes

# Create a directory for logs if it doesn't exist
mkdir -p logs

# Create the check script
cat > check_app.sh << 'EOL'
#!/bin/bash

# Path to your application
APP_DIR=/path/to/your/app

# Check if the application is running
if ! pgrep -f "node app.js" > /dev/null; then
    echo "$(date) - Application not running. Restarting..." >> $APP_DIR/logs/app_monitor.log
    
    # Change to app directory
    cd $APP_DIR
    
    # Start the application in the background
    nohup npm start > $APP_DIR/logs/app.log 2>&1 &
    
    echo "$(date) - Application restarted." >> $APP_DIR/logs/app_monitor.log
else
    echo "$(date) - Application running." >> $APP_DIR/logs/app_monitor.log
fi
EOL

# Make the check script executable
chmod +x check_app.sh

# Update the path in the script to the actual path
sed -i "s|/path/to/your/app|$(pwd)|g" check_app.sh

# Instructions for setting up the cron job
echo "To set up a cron job to run every 5 minutes, run 'crontab -e' and add the following line:"
echo "*/5 * * * * $(pwd)/check_app.sh"
echo ""
echo "This will check and restart your application if it stops running."