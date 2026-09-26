<?php

namespace App\Enums;

enum ProjectStatus: string
{
    case Shipped = 'shipped';
    case InDevelopment = 'in-development';
}
