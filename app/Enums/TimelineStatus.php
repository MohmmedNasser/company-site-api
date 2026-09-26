<?php

namespace App\Enums;

enum TimelineStatus: string
{
    case Done = 'done';
    case InProgress = 'in-progress';
    case Todo = 'todo';
}
