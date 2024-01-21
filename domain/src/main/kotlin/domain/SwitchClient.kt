package domain

import domain.thing.Status

interface SwitchClient {
    fun switch(status: Status)
}