<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333;">

    <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
        <h1 style="color: #467576; text-align: center;">Case Guard</h1>
        <h2 style="color: #4A90E2; text-align: center;">Event Reminder</h2>

        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <h2 style="font-size: 24px; color: #333;"></h2>
            
            <p style="font-size: 16px; color: #666;">Event : {{ $event->title }}</p>
        </div>

        <p style="margin-top: 20px; text-align: center; font-size: 14px; color: #666;">
            Start: {{ $event->start }}
        </p>

        <p style="margin-top: 20px; text-align: center; font-size: 14px; color: #666;">
            End: {{ $event->end }}
        </p>

        <p style="text-align: center;">Thanks,<br>{{ config('app.name') }}</p>
    </div>

</body>