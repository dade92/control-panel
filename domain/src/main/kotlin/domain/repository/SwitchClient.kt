package domain.repository

import domain.Status

interface SwitchClient {
    fun switch(status: Status)
}