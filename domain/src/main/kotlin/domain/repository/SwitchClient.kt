package domain.repository

import domain.Device
import domain.DeviceHost
import domain.Status

interface SwitchClient {
    fun switch(status: Status)

    fun switch(deviceHost: DeviceHost, idOnDevice: Int, newStatus: Status)
}